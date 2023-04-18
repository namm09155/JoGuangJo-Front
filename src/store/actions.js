import {
    // 태현씨 qna 게시판
    REQUEST_QNA_BOARD_LIST_TO_SPRING,
    REQUEST_QNA_BOARD_TO_SPRING,

    // 태현씨 qna 게시판 - 댓글 기능
    REQUEST_QNA_COMMENT_LIST_FROM_SPRING,

    // 진우씨 상품 게시판
    REQUEST_PRODUCT_LIST_TO_SPRING,
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING,
    REQUEST_ALL_PRODUCT_TO_SPRING,

    // 태현씨 장바구니
    REQUEST_CART_LIST_FROM_SPRING,

} from './mutation-types'

import axios from 'axios'

export default {
    // 태현씨 qna 게시판
    requestCreateQnaBoardToSpring({}, payload) {
        axios.post(`http://localhost:7777/qnaBoard/register`, payload)
        .then(() => {
            alert('게시물 등록 성공!')
        })
        .catch(() => {
            alert('문제 발생')
        }) 
    },

    requestQnaBoardListToSpring({commit}) {
        console.log("list 요청 테스트 완료.");
        return axios.get('http://localhost:7777/qnaBoard/list')
        .then((res) => {
            commit(REQUEST_QNA_BOARD_LIST_TO_SPRING, res.data)
        })
    },

    requestQnaBoardToSpring ({ commit }, qnaBoardId) {
        console.log("read 요청 테스트 완료")
        return axios.get(`http://localhost:7777/qnaBoard/${qnaBoardId}`)
        .then((res) => {
            commit(REQUEST_QNA_BOARD_TO_SPRING, res.data)
        })
    },

    requestQnaBoardModifyToSpring ({}, { qnaBoardId, payload }) {
        return axios.put(`http://localhost:7777/qnaBoard/${qnaBoardId}`, payload)
          .then(() => {
            alert("질문 게시글 수정 성공")
          })
          .catch(() => {
            alert("질문 게시글 문제 발생!")
          })
      },

    requestDeleteQnaBoardToSpring ({}, qnaBoardId) {
        console.log("삭제 요청 테스트 완료")
        return axios.delete(`http://localhost:7777/qnaBoard/${qnaBoardId}`)
            .then(() => {
                alert("질문 게시글 삭제 성공")
            })
            .catch(() => {
                alert("질문 게시글 문제 발생!")
            })
    },


    // 태현씨 qna 게시판 - 댓글 기능
    requestQnaCommentRegisterToSpring({}, payload) {
        const { writer, comment, qnaBoardId, qnaCommentId} = payload
        return axios.post(`http://localhost:7777/qnaBoard/qnaComment/register`, { writer, comment, qnaBoardId, qnaCommentId })
        .then(() => {
            alert('댓글 등록을 완료하였습니다.')
        })
        .catch(() =>{
            alert('댓글 등록 실패')
        })
    },

    requestQnaCommentListFromSpring({commit}, qnaBoardId ){
        return axios.get(`http://localhost:7777/qnaBoard/qnaComment/${qnaBoardId}`)
        .then((res) => {
            commit(REQUEST_QNA_COMMENT_LIST_FROM_SPRING, res.data)
        })
    },
    
    requestQnaCommentListFromSpring({commit}, qnaBoardId ){
        return axios.get(`http://localhost:7777/qnaBoard/qnaComment/${qnaBoardId}`)
        .then((res) => {
            commit(REQUEST_QNA_COMMENT_LIST_FROM_SPRING, res.data)
        })
    },
    requestQnaCommentDeleteToSpring({}, payload) {
        const { qnaCommentId } = payload;
        return axios.delete(`http://localhost:7777/qnaBoard/qnaComment/${qnaCommentId}`)
        .then (() => {
            alert("댓글 삭제 성공")
        })
        .catch(() => {
            alert('댓글 삭제 실패')
        })
    },


    // 진우씨 상품 게시판
    requestCreateProductToSpring ({}, payload) {
        console.log('payload: ' + payload)
        const { productName, content, writer, price } = payload
        return axios.post('http://localhost:7777/product/register',
            payload)
            //{ productName, content, writer, price })
            .then(() => {
                alert('상품 등록 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },

    requestProductListToSpring ({ commit }) {
        return axios.get('http://localhost:7777/product/list')
            .then((res) => {
                commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data)
            })
    },

    requestProductToSpring ({ commit }, productId) {
        return axios.get(`http://localhost:7777/product/${productId}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_TO_SPRING, res.data)
            })
    },

    requestDeleteProductToSpring ({}, productId) {
        return axios.delete(`http://localhost:7777/product/${productId}`)
            .then(() => {
                alert("삭제 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    requestProductModifyToSpring ({}, payload) {
        const { productName, content, productId, writer, price } = payload
        return axios.put(`http://localhost:7777/product/${productId}`,
            { productName, content, writer, price })
            .then(() => {
                alert("수정 성공")
            })
            .catch(() => {
                alert("문제 발생!")
            })
    },

    requestProductImageToSpring ({ commit }, productId) {
        return axios.get(`http://localhost:7777/product/imageList/${productId}`)
            .then((res) => {
                commit(REQUEST_PRODUCT_IMAGE_LIST_TO_SPRING, res.data)
            })
    },

    requestAllOfProductToSpring ({ commit }) {
        return axios.get('http://localhost:7777/product/all')
            .then((res) => {
                commit(REQUEST_ALL_PRODUCT_TO_SPRING, res.data)
                console.log("allProduct: " + res.data)
            })
    },



    // 태현씨 장바구니

    requestRegisterCartToSpring({}, payload) {
        const {memberId, productId, count} = payload
        console.log("actions.js \n memberId = " + memberId + "\nproductId = " + productId + "\ncount = " + count)
        return axios.post(`http://localhost:7777/cart/register`,
            {memberId, productId, count})
            .then(() => {
            })
        },

        requestCartListFromSpring({commit}, memberId) {
            console.log("list 요청 테스트 완료.");
            console.log("actions.js\n cart memberId " + memberId);
            return axios.get(`http://localhost:7777/cart/list/${memberId}`)
            .then((res) => {
                commit(REQUEST_CART_LIST_FROM_SPRING, res.data)
            })
        },
        requestDeleteCartItemToSpring({ }, cartItemIds) {
            console.log("actions.js \n delete request = " + cartItemIds);
            return axios.delete(`http://localhost:7777/cart/delete?cartItemIds=${cartItemIds}`)
            .then(() => {
                alert("삭제 성공");
            })
            .catch(() => {
                alert("삭제 실패");
            })
        }

}